export default {
    name: 'localeImage',
    type: 'image',
    options: {
        hotspot: true
    },
    fields: [
        {
            title: 'Caption',
            name: 'caption',
            type: 'localeString',
            description: 'Bildunterschrift'
        },
        {
            title: 'Alternativer Text',
            name: 'alt',
            type: 'localeString',
            description: 'Text der angezeigt wird, wenn das Bild nicht geladen werden kann.'
        },
        {
            title: 'Credits',
            name: 'credits',
            type: 'string'
        }
    ]
}