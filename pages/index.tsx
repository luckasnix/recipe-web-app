import Head from 'next/head'
import Link from 'next/link'
import { GetServerSideProps } from 'next'

export default function Home({ recipes }) {
  return (
    <div>
      <Head>
        <title>Find the best recipes ever</title>
      </Head>
      <main>
        <h1>Select a recipe</h1>
        <ul>
          {recipes.map(({ slug, name }: { slug: string, name: string }) => (
            <li key={slug}>
              <Link href='recipes/[recipe]' as={`recipes/${slug}`}>
                <a>{name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      recipes: [
        {
          slug: 'non-alcoholic-pina-colada',
          name: 'Non-alcoholic Pina Colada'
        }
      ]
    }
  }
}
