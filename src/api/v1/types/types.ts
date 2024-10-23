declare module "express-session" {
    interface SessionData {
      loggedInUserID: string
    }
  }