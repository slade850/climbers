const model = {
    recovery: (firstName, link, key) => {
        const html = [
            '<!DOCTYPE html>',
            '<html lang="en">',
            '<head>',
                '<meta charset="UTF-8">',
                '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
                '<title>Recovery</title>',
            '</head>',
            '<body>',
            '    <h1 style="text-align: center;">fastblock</h1>',
            '    <div style="padding: 20px;">',
            `        <h2>Bonjour ${firstName},</h2>`,
            '        <p>Vous venez d’effectuer une demande de réinitialisation de mot de passe, pour en créer un nouveau cliqué sur le lien suivant (valide pendant 10min):</p>', 
            `        <p><a href="${link}" target="_blank" rel="noopener noreferrer">Réinitialiser mon mot de passe</a></p>`,
            `        <p>Votre Clé (a ajouter dans le formulaire): ${key}`,
            '        <p>Si vous n’avez pas fait cette demande nous vous conseillons de modifier au plus vites vos mots de passe mail et compte associé.</p>',
            '        <p>Cordialement la Team Fastblock.</p>',
            '    </div>',
            '</body>',
            '</html>'
        ]
        return html.join('\n');
    },
    reset: (firstName) => {
        const html = [
            '<!DOCTYPE html>',
            '<html lang="en">',
            '<head>',
                '<meta charset="UTF-8">',
                '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
                '<title>Recovery</title>',
            '</head>',
            '<body>',
            '    <h1 style="text-align: center;">fastblock</h1>',
            '    <div style="padding: 20px;">',
            `        <h2>Bonjour ${firstName},</h2>`,
            '        <p>Votre mot de passe vient d’être modifié </p>', 
            '        <p>Si vous n’avez pas fait cette demande nous vous conseillons de modifier au plus vites vos mots de passe mail et compte associé.</p>',
            '        <p>Cordialement la Team Fastblock.</p>',
            '    </div>',
            '</body>',
            '</html>'
        ]
        return html.join('\n');
    }
}

module.exports = model;