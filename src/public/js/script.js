const parserMessageURL = (url) => {
  const querysList = url.split("&");
  if (url.length == 0 || querysList.length == 0)
    return []

  const queryObject = querysList
    .map(qr => qr.replace("?", ""))

    .map(qr => qr.split('='))
    .map(arrqr => {
      let valueDecode =  decodeURI(arrqr[1]).replace(' ', "");
      return { [arrqr[0]]: /^[0-9]+$/.test(valueDecode) ? Number(valueDecode) : valueDecode }
    })

  return queryObject;
}

const MESSAGES = {
  errors: {
    fornecedor: [
      "inpossivel delete forncedor"
    ]
  },
  success: {
    fornecedor: [
      "Novo forncedor criado com successo"
    ]
  }

}