/* eslint-disable no-console */
import GoogleSpreadsheet from 'google-spreadsheet'
import {SPREADSHEET_KEY} from '../config/keys'

const doc = new GoogleSpreadsheet(SPREADSHEET_KEY, null, {gzip: false})

function getValue(sheet, key, row, col) {
  return new Promise((resolve, reject) => {
    sheet.getCells({
      'min-row': row,
      'max-row': row,
      'min-col': col,
      'max-col': col,
      'return-empty': true,
    }, (err, cells) => {
      if (err) {
        console.log('error', err)
      }
      const cell = cells[0]
      resolve({[key]: cell.value})

      // cells have a value, numericValue, and formula
      //cell.value == '1'
      //cell.numericValue == 1;
      //cell.formula == '=ROW()';
    })
  })

}

export function getSheetData() {
  return new Promise((resolve, reject) => {
    doc.getInfo((err, info) => {
      if (err) {
        console.log('error', err)
      }
      const sheet = info.worksheets[0]

      const promises = [
        getValue(sheet, 'numberOfDaysSinceStart', 2, 2),
        getValue(sheet, 'numberOfDaysOnKeto', 3, 2),
        getValue(sheet, 'percentageOfDaysOnKeto', 4, 2),
        getValue(sheet, 'startingWeight', 5, 2),
        getValue(sheet, 'currentWeight', 6, 2),

        getValue(sheet, 'AMZN', 2, 4),
        getValue(sheet, 'AMZNChange', 2, 5),
        getValue(sheet, 'BYND', 3, 4),
        getValue(sheet, 'BYNDChange', 3, 5),
        getValue(sheet, 'AAPL', 4, 4),
        getValue(sheet, 'AAPLChange', 4, 5),
        getValue(sheet, 'ATVI', 5, 4),
        getValue(sheet, 'ATVIChange', 5, 5),
        getValue(sheet, 'TSLA', 6, 4),
        getValue(sheet, 'TSLAChange', 6, 5),
        getValue(sheet, 'WEN', 10, 4),
        getValue(sheet, 'WENChange', 10, 5),
        getValue(sheet, 'CRBN', 13, 4),
        getValue(sheet, 'CRBNChange', 13, 5),
        getValue(sheet, 'MCD', 14, 4),
        getValue(sheet, 'MCDChange', 14, 5),
        getValue(sheet, 'AU', 15, 4),
        getValue(sheet, 'AUChange', 15, 5),
      ]
      Promise.all(promises).then((arrayOfResponses) => {
        resolve(Object.assign({}, ...arrayOfResponses))
      })
    })
  })
}
