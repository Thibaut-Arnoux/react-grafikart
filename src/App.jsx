import {
    NavLink,
    Outlet,
    RouterProvider,
    createBrowserRouter,
    defer,
    useRouteError
} from 'react-router-dom';
import { ThemeContextProvider } from './hooks/useTheme.jsx';
import { Single } from './pages/Single.jsx';
import { Blog } from './pages/Blog.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <PageError />,
        children: [
            {
                path: '',
                element: <div>Home</div>
            },
            {
                path: 'blog',
                element: (
                    <div className="row">
                        <aside className="col-3">
                            <h2>Sidebar</h2>
                        </aside>
                        <main className="col-9">
                            <Outlet />
                        </main>
                    </div>
                ),
                children: [
                    {
                        path: '',
                        element: <Blog />,
                        loader: () => {
                            const posts = fetch(
                                'https://jsonplaceholder.typicode.com/posts?_limit=10'
                            ).then((r) => r.json());

                            return defer({ posts });
                        }
                    },
                    {
                        path: ':id',
                        element: <Single />
                    }
                ]
            },
            {
                path: 'contact',
                element: <div>Contact</div>
            }
        ]
    }
]);

function Root() {
    return (
        <>
            <header>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/blog">Blog</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                </nav>
            </header>
            <div className="container my-4">
                <Outlet />
            </div>
        </>
    );
}

function PageError() {
    const error = useRouteError();

    return (
        <>
            <h1>Une erreur est survenue</h1>
            <p>{error?.error?.toString() ?? error?.toString()}</p>
        </>
    );
}

function App() {
    return (
        <ThemeContextProvider>
            <RouterProvider router={router} />
        </ThemeContextProvider>
    );
}

export default App;
