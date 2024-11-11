import React, {Component} from 'react';

import axiosIn from './../../../axios';

import Post from './../../../components/Post/Post';
import classes from './Posts.module.css';
import { Link, Route, Routes } from 'react-router-dom';
import FullPostWrapper from '../../../hoc/FullPostWrapper';

class Posts extends Component {

    state = {
        posts : []
    }
    
    postSelectedhandler = (id) => {
        this.setState({ selectedPostId : id });
    }

    componentDidMount () {
        this.loadData();
    }

    componentDidUpdate () {
        this.loadData();
    }

    loadData () {
        if(this.state.posts.length === 0) {
            axiosIn.get('/posts')
            .then(response => {
                const posts = response.data.slice(0,4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author : "Meet"
                    }
                });
                this.setState({posts : updatedPosts});
            })
            .catch(error => {
                this.setState({error : true});
            });
        }
        
    }

    render() {

        let posts = <p style={{textAlign : 'center'}}>Somethign went wrong</p>;
        if(!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                        <Link to={post.id.toString()} key={post.id}>
                            <Post 
                            title={post.title} 
                            key={post.id} 
                            author={post.author}
                            clicked={() => {this.postSelectedhandler(post.id)}}/>
                        </Link>
                        )
            });
        }

        return (
                <div>
                    <section className={classes.Posts}>
                        {posts}
                    </section>
                    <Routes>
                        <Route path=':id' element={<FullPostWrapper  />}/>
                    </Routes>
                </div>
        );
    }
    
}

export default Posts;
