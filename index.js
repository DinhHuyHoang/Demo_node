const Vue = require('vue')
const renderer  = require('vue-server-renderer').createRenderer()
const app = require('express')()
const port = 3000

app.get('/', (req, res) => { 
    const appVue = new Vue({
        data: {
            url: req.url
        },
        template: require('fs').readFileSync('./index.template.html', 'utf-8')
    })

    renderer.renderToString(appVue, (err, html) => {
        if (err) {
            res.status(500).end('Internal Server Error')
            return
        }
        res.end(html)
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))