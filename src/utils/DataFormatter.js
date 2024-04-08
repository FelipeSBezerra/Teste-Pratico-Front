export function formatarData(data) {
    const dataParaFormatar = new Date(data)
    const formatter = Intl.DateTimeFormat('pt-BR', {dateStyle: 'short', timeStyle: 'short'});
    return formatter.format(dataParaFormatar)
  }