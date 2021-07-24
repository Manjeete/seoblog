import Layout from '../components/Layout';
import Link from 'next/link';

const Index = () =>{
    return (
        <Layout>
            <h2>
                Index Page
            </h2>
            <Link href="/signup"><a>Signup</a></Link>
            <Link href="/signin"><a>Signup</a></Link>
        </Layout>
    )
}

export default Index;