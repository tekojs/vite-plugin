import { test } from '@t8ngs/runner'

test.group('Plugin tests', () => {
  test('should run the plugin', async ({ assert }) => {
    assert(true).toBe(true)
  })
})