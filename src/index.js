
import App from './app'

const app = new App()
app.run().catch(app.log.error)