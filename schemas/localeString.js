const supportedLanguages = [
    {id: 'de', title: 'Deutsch', isDefault: true},
    {id: 'en', title: 'Englisch'},
];

export default {
    name: 'localeString',
    type: 'object',
    fields: supportedLanguages.map(lang => (
        {
            title: lang.title,
            name: lang.id,
            type: 'string'
        }
    ))
}