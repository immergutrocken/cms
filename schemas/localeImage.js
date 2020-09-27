import localeString from "./localeString";

export default {
    name: 'localeImage',
    type: 'image',
    fields: [
        {
            title: 'Caption',
            name: 'caption',
            type: 'localeString',
            description: 'Bildunterschrift',
            options: {
                isHighlighted: true
            }
        },
        {
            title: 'Alternativer Text',
            name: 'alt',
            type: 'localeString',
            description: 'Text der angezeigt wird, wenn das Bild nicht geladen werden kann.',
            options: {
                isHighlighted: true
            }
        },
        {
            title: 'Credits',
            name: 'credits',
            type: 'string',
            options: {
                isHighlighted: true
            }
        }
    ]
}