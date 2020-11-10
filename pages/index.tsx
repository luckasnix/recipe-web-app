import Head from 'next/head'
import Link from 'next/link'
import { GetServerSideProps } from 'next'

export default function Home({ recipes }) {
  return (
    <div>
      <Head>
        <title>Find a recipe | Awesome Recipes</title>
        <meta name='description' content='Find a recipe the easiest way'/>
      </Head>
      <main>
        <h1>Find a recipe</h1>
        <ul>
          {recipes.map(({ slug, name }: { slug: string, name: string }) => (
            <li key={slug}>
              <Link href='recipes/[recipe]' as={`recipes/${slug}`}>
                <a>{name}</a>
              </Link>
            </li>
          ))}
        </ul>
        <form name='contact' method='POST' data-netlify>
          <input type='hidden' name='form-name' value='contact'/>
          <p>
            <label htmlFor='name-input'>Name:</label>
            <input id='name-input' type='text' name='name' autoComplete='off'/>
          </p>
          <p>
            <label htmlFor='email-input'>Email:</label>
            <input id='email-input' type='email' name='email' autoComplete='off'/>
          </p>
          <button type='submit'>Send</button>
        </form>
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
