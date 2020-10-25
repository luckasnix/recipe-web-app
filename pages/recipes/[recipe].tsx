import Head from 'next/head'
import Link from 'next/link'
import { jsonLdScriptProps } from 'react-schemaorg'
import { Recipe } from 'schema-dts'
import { GetServerSideProps } from 'next'

export default function RecipeTemplate({ recipe }) {
  return (
    <div>
      <Head>
        <title>{recipe.name} | Awesome Recipes</title>
        <meta name='description' content={recipe.description}/>
        <script
          {...jsonLdScriptProps<Recipe>({
            '@context': 'https://schema.org',
            '@type': 'Recipe',
            name: recipe.name,
            image: recipe.image,
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
        <img src={recipe.image[0]} alt={recipe.name} width={480} />
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
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      recipe: {
        slug: 'non-alcoholic-pina-colada',
        name: 'Non-alcoholic Pina Colada',
        image: [
          'https://img.cybercook.com.br/receitas/312/pina-colada-5.jpeg'
        ],
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
        ]
      }
    }
  }
}
