import { getRandom } from "./getRandomNumber";

/// 5 characters → 62⁵ = 916 million
// 6 characters → 62⁶ = 56.8 billion
// 7 characters → 62⁷ = 3.5 trillion
// 6 characters should be more than enough to never ever have a collision.
export function generateNewUrl(): string {
        let newUrl = "";

        for (let i = 0; i < 6; i++) {
                const characType = Math.round(Math.random() * 2);
                let charac = '';

                switch (characType) {
                        case 0:
                                charac = String.fromCharCode(getRandom(97, 122)); // a-z
                        break;
                        case 1:
                                charac = String.fromCharCode(getRandom(65, 90)); // A-Z
                        break;
                        case 2:
                                charac = String.fromCharCode(getRandom(48, 57)); // 0-9
                        break;
                        default:
                                console.log("wtf?");
                        break;
                }
                newUrl += charac;
        }

        return newUrl;
}
