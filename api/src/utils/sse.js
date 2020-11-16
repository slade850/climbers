const eventsHandler = (req, res) => {
    // Mandatory headers and http status to keep connection open
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);
    res.write({data: `${req.user.id} Connected\n\n`});

    req.on('close', () => {
        console.log(`${req.user.id} Connection closed`);
    });
};

const sendEventsToGroup = (newEvent, clients) => {
    clients.forEach(c => c.res.write({data: `${JSON.stringify(newEvent)}\n\n`}))
};

