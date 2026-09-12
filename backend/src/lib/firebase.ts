const admin: any = {
  auth: () => ({
    verifyIdToken: async () => {
      throw new Error('Firebase is disabled')
    },
  }),
}

export default admin