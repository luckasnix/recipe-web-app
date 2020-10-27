import Head from 'next/head'
import Link from 'next/link'
import { jsonLdScriptProps } from 'react-schemaorg'
import { Recipe } from 'schema-dts'
import { GetServerSideProps } from 'next'

export default function RecipePage({ recipe }) {
  return (
    <>
      <Head>
        <title>{recipe.name} | Awesome Recipes</title>
        <meta name='description' content={recipe.description}/>
        <meta property='og:url' content={`http://localhost:3000/recipes/${recipe.slug}`}/>
        <meta property='og:site_name' content='Awesome Recipes'/>
        <meta property='og:title' content={recipe.name}/>
        <meta property='og:description' content={recipe.description}/>
        <meta property='og:type' content='website'/>
        <meta property='og:image' content={recipe.image.url}/>
        <meta property='og:locale' content={recipe.locale.replace('-', '_')}/>
        <script
          {...jsonLdScriptProps<Recipe>({
            '@context': 'https://schema.org',
            '@type': 'Recipe',
            name: recipe.name,
            image: recipe.image.url,
            datePublished: recipe.datePublished,
            description: recipe.description,
            keywords: recipe.keywords,
            recipeIngredient: recipe.ingredients,
            recipeInstructions: recipe.instructions.map((instruction: string) => ({
              '@type': 'HowToStep',
              text: instruction
            }))
          })}
        />
      </Head>
      <main>
        <Link href='/'>
          <a>Go to home</a>
        </Link>
        <h1>{recipe.name}</h1>
        <p>{recipe.description}</p>
        <img
          src={recipe.image.url}
          alt={recipe.image.alt}
          width={480}
        />
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingredient: string, idx: number) => (
            <li key={idx}>{ingredient}</li>
          ))}
        </ul>
        <h2>Instructions</h2>
        <ul>
          {recipe.instructions.map((instruction: string, idx: number) => (
            <li key={idx}>{instruction}</li>
          ))}
        </ul>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      recipe: {
        slug: 'non-alcoholic-pina-colada',
        name: 'Non-alcoholic Pina Colada',
        image: {
          url: 'https://img.cybercook.com.br/receitas/312/pina-colada-5.jpeg',
          alt: 'Non-alcoholic Pina Colada'
        },
        datePublished: '2018-03-10',
        description: 'This non-alcoholic pina colada is my favorite!',
        keywords: 'non-alcoholic',
        ingredients: [
          '2 cups of pineapple juice',
          '5/8 cup cream of coconut',
          'ice'
        ],
        instructions: [
          'Blend 2 cups of pineapple juice and 5/8 cup cream of coconut until smooth.',
          'Fill a glass with ice.',
          'Pour the pineapple juice and coconut mixture over ice.'
        ],
        locale: 'en-US'
      }
    }
  }
}
