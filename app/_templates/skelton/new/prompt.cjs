module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'コンポーネント名を入力してください',
    validate: (input) => input !== '',
  },
]