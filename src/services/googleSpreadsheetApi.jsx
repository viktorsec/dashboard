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
      ]
      Promise.all(promises).then((arrayOfResponses) => {
        resolve(Object.assign({}, ...arrayOfResponses))
      })
    })
  })
}
