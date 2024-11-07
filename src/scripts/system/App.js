import * as PIXI from 'pixi.js'
import { Loader } from './Loader'

class Application {
    run(config) {
        this.config = config

        this.app = new PIXI.Application({ resizeTo: window })

        document.body.appendChild(this.app.view)

        this.loader = new Loader(this.app.loader, this.config)
        this.loader.preload().then(() => this.start())
    }

    res(key) {
        return this.loader.resources[key].texture
    }

    sprite(key) {
        return new PIXI.Sprite(this.res(key))
    }

    start() {
        this.scene = new this.config['startScene']()
        this.app.stage.addChild(this.scene.container)
    }
}

export const App = new Application()
