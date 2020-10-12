import { SitemapStream, streamToPromise } from 'sitemap'
import { NextApiRequest, NextApiResponse } from 'next'

/**
 * Receive all URLs
 */
const recipes = [
  {
    slug: 'non-alcoholic-pina-colada',
    name: 'Non-alcoholic Pina Colada'
  }
]

export default async (req: NextApiRequest, res: NextApiResponse ) => {
  /**
   * Configure Sitemap Stream
   */
  const smStream = new SitemapStream({
    hostname: `http://${req.headers.host}`
  })

  /**
   * Write a individual URL
   */
  smStream.write({
    url: '/'
  })

  /**
   * Iterate on all recipes and get the slug
   * to create the URL
   */
  recipes.forEach(({ slug }: { slug: string }) => {
    smStream.write({
      url: `recipes/${slug}`
    })
  })

  smStream.end()

  const sitemap = await streamToPromise(smStream)
    .then((sm) => sm.toString())
  
  /**
   * Send the sitemap to client
   */
  res.setHeader('Content-Type', 'application/xml')

  res.write(sitemap)

  res.end()
}
