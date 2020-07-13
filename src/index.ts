import ioHook from 'iohook'
import {
  Builder,
  By,
  Key,
  until,
  WebDriver,
  Alert,
  Actions,
} from 'selenium-webdriver'
import { setInterval } from 'timers'

let driver: WebDriver
;(async function example() {
  driver = await new Builder().forBrowser('chrome').build()

  try {
    await driver.get('https://www.hometax.go.kr/')

    setInterval(async () => {
      try {
        let alert = driver.switchTo().alert()
        await alert.accept()
        await alert.dismiss()
      } catch (e) {}
    }, 500)

    await driver.wait(until.elementLocated(By.id('textbox81212912')), 3000)
    await driver.findElement(By.id('textbox81212912')).click()
  } finally {
  }
})()

const loginStratage = async (_: Array<string | number>) => {
  console.log('Start loginStratage()')

  try {
    const logoutButton = await driver.findElement(By.id('textbox915'))
    await logoutButton.click()

    let alert = driver.switchTo().alert()
    await alert.accept()
    await alert.dismiss()

    await driver.wait(until.titleIs('국세청 홈택스'), 5000).then(() => {
      console.log('mainPage')
    })
  } catch (e) {
    console.log(e)
  }

  const loginButton = await driver.findElement(By.id('textbox81212912'))
  await loginButton.click()
  // const companyButton = await driver.findElement(By.id('btnApply'))
  driver
    .wait(until.elementIsEnabled(driver.findElement(By.id('btnApply'))))
    .then(async () => {
      await driver.findElement(By.id('btnApply')).click()
    })

  await console.log('catch!')
}

const taxStratage = async (_: Array<string | number>) => {
  try {
    await driver.findElement(By.id('a_0104030200')).click()
  } catch (e) {
    try {
      await driver.findElement(By.id('a_0104030000')).click()
    } catch (e) {
      try {
        await driver.findElement(By.id('textbox81212923')).click()
      } catch (e) {
        console.log('wtf')
      }
    }
  }
}

const initHotkey = () => {
  enum KEYCODE {
    F6 = 64,
    F7,
    F8,
  }

  // ioHook.registerShortcut([KEYCODE.F6], (keys: Array<string | number>) => {})

  ioHook.registerShortcut([KEYCODE.F7], loginStratage)

  ioHook.registerShortcut([KEYCODE.F8], taxStratage)

  ioHook.start()
}

const init = () => {
  initHotkey()
  // read(cardDataFilePath)
}

init()
