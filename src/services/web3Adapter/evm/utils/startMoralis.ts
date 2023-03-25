import Moralis from 'moralis'

export const startMoralis = async () => {
  if (!Moralis.Core.isStarted) {
    await Moralis.start({
      apiKey: process.env.MORALIS_API_KEY,
    })
  }
}
