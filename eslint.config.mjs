import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    'packages/vscode/src/generated/meta.ts',
    'packages/raycast',
  ],
})
