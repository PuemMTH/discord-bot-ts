import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';

export interface Text {
    text: string;
    color: string;
    font?: string;
    size?: number;
}

export class drawImage {
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public async saveImage(path: string, font: string ,text: Text[]) {
        const canvas = await createCanvas(this.width, this.height);
        const context = await canvas.getContext('2d')

        const image2 = await loadImage('./image/Dashboard.png')
        await context.drawImage(image2, 0, 0, this.width, this.height)
        // add text font 2005_iannnnnGMO
        context.font = font
        context.fillStyle = '#000'

        let LineHeight = 200
        text.forEach(element => {
            context.fillStyle = element.color
            context.fillText(element.text, 120, LineHeight)
            LineHeight += 80
        })
 
        // write text
        // await context.fillText(`${text.join("\n")}`, 120, 190)
        await fs.writeFileSync(path, canvas.toBuffer())
        console.log('Image saved')
        return canvas.toBuffer()
    }
}