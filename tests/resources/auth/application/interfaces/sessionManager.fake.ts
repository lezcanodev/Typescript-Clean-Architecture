

export const fakeSessionManager = {
    createToken: jest.fn(),
    tokenBelongsTo: jest.fn(),
    verifyToken: jest.fn()
}