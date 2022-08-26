// help
export const execute = (commandStr: string) => {
    const { setHistoryPath, addShowCommand } = useDirectoryStore()
    setHistoryPath()
    addShowCommand({
      commandStr,
      type: 'info',
      description: 'Here we goo :'
    })
  }
  