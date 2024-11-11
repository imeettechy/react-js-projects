import React, { Component } from 'react';

import classes from './Blog.module.css';
import Posts from './Posts/Posts';
import { Route, Routes, NavLink, Navigate } from 'react-router-dom';
// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';

const NewPostLazy = React.lazy(() => import('./NewPost/NewPost'));

const AsyncNewPost = asyncComponent(() => {
    console.log('Attempting to import NewPost...');
    return import('./NewPost/NewPost');
});


class Blog extends Component {

    state = {
        auth : true
    }

    render () {
        return (
            <div className={classes.Blog}>
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}
                            className={({ isActive }) => isActive ? classes.active : undefined}
                            >New Post</NavLink></li>
                            <li><NavLink to="/posts"
                                className={({ isActive }) => isActive ? classes.active : undefined}
                                >Posts</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Routes>
                    <Route path="/" element={<Navigate from="/" to="/posts" replace />} />
                    {/* {this.state.auth ? (
                        // <Route path="/new-post" element={<NewPost />} />
                        <Route path="/new-post" element={<AsyncNewPost />} />
                    ) : (
                        <Route path="/new-post" element={<Navigate to="/posts" replace />} />
                    )} */}
                    {this.state.auth ? (
                        <Route
                            path="/new-post"
                            element={
                                <React.Suspense fallback={<p>Loading...</p>}>
                                    <NewPostLazy />
                                </React.Suspense>
                            }
                        />
                    ) : (
                        <Route path="/new-post" element={<Navigate to="/posts" replace />} />
                    )}
                    <Route path='/posts/*' element={<Posts />}/>
                    {/* <Route path='*' element={<h1>Not Found</h1>}/> */}
                    <Route path='*' element={<Posts />}/>
                </Routes>
            </div>
        );
    }
}

export default Blog;