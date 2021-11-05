import { IFuck } from "../types/commonTypes";

export async function fetchFucks(): Promise<IFuck[]> {
    const data = await fetch('http://foaas.com/fucks');
    let fucks = await data.text();
    let fucksArr = fucks.split('</tr>');
    fucksArr.pop();
    let results: IFuck[] = [];
    for (let f of fucksArr) {
      let unTrimmedStr = f.split('</td>')[1]?.split('form')[1].trim().split(':from').join(`@from@`).split(':to').join(`@to@`).split(':company').join(`@company@`).split(':name').join(`@name@`).split(':noun').join(`@noun@`).split(':language').join(`@language@`).split('');
      unTrimmedStr.pop();
      unTrimmedStr.shift();
      results.push({
        title: f.split('</td>')[0].split('/')[1],
        text: unTrimmedStr.join(''),
        id: results.length
      });
    }
    return results;
}
