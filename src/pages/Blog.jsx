import { Suspense } from 'react';
import { Await, NavLink, useAsyncValue, useLoaderData } from 'react-router-dom';
import { SimpleSpinner } from '../components/spinners/SimpleSpinner';

export function Blog() {
    const { posts } = useLoaderData();

    return (
        <>
            <h1>Mon Blog</h1>
            <Suspense fallback={<SimpleSpinner />}>
                <Await resolve={posts}>
                    <PostsList />
                </Await>
            </Suspense>
        </>
    );
}

function PostsList() {
    const posts = useAsyncValue();

    return (
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <NavLink to={post.id}>{post.title}</NavLink>
                </li>
            ))}
        </ul>
    );
}
