import expect from 'expect'
import execSteps from './execSteps'

export default (history, done) => {
  let prevLocation

  const steps = [
    (location) => {
      expect(location).toMatch({
        path: '/'
      })

      history.replace('/home')
    },
    (location, action) => {
      expect(action).toBe('REPLACE')
      expect(location).toMatch({
        path: '/home'
      })

      prevLocation = location

      history.replace('/home')
    },
    (location, action) => {
      expect(action).toBe('REPLACE')
      expect(location).toMatch({
        path: '/home'
      })

      expect(location).toNotBe(prevLocation)

      history.goBack()
    },
    (location, action) => {
      expect(action).toBe('POP')
      expect(location).toMatch({
        path: '/'
      })
    }
  ]

  execSteps(steps, history, done)
}