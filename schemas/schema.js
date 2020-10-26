// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
import { RiArticleLine } from 'react-icons/ri'
import localeString from "./localeString";
import localeImage from "./localeImage";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
    // We name our schema
    name: 'default',
    // Then proceed to concatenate our document type
    // to the ones provided by any plugins that are installed
    types: schemaTypes.concat([
        /* Your types here! */
        localeString,
        localeImage,
        {
            title: 'Artikel',
            name: 'article',
            icon: RiArticleLine,
            type: 'document',
            fields: [
                {
                    title: 'Titel',
                    name: 'title',
                    type: 'localeString'
                },
                {
                    title: 'Untertitel',
                    name: 'subtitle',
                    type: 'localeString'
                },
                {
                    title: 'Banner',
                    name: 'banner',
                    type: 'localeImage'
                },
                {
                    title: 'Autor',
                    name: 'author',
                    type: 'string'
                },
                {
                    title: 'Inhalt',
                    name: 'content',
                    type: 'array',
                    of: [{type: 'block'}]
                }
            ],
            preview: {
              select: {
                title: 'title.de',
                media: 'banner'
              }
            }
        }
    ])
})
