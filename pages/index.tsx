import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { jsonLdScriptProps } from 'react-schemaorg'
import { Recipe } from 'schema-dts'

export default function Home({ recipe }) {
  return (
    <div>
      <Head>
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
        <h1>Receitas</h1>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      recipe: {
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
