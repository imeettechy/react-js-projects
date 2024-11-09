import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import classes from './Blog.module.css';

import axiosIn from './../../axios';

class Blog extends Component {

    state = {
        posts : [],
        selectedPostId : null,
        error : false
    }

    componentDidMount () {
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

    postSelectedhandler = (id) => {
        this.setState({ selectedPostId : id });
    }

    render () {

        let posts = <p style={{textAlign : 'center'}}>Somethign went wrong</p>;
        if(!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post 
                        title={post.title} 
                        key={post.id} 
                        author={post.author}
                        clicked={() => {this.postSelectedhandler(post.id)}}/>
            });
        }

        return (
            <div>
                <section className={classes.Posts}>
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;