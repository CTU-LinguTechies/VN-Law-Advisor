class TokenService {
    private _accessTokenKey = 'accessToken';
    private _expiratedAtKey = 'expiratedAt';
    private _refreshTokenKey = 'refreshToken';

    private _accessToken = '';
    private _refreshToken = '';
    private _expiratedAt = 0;

    constructor() {
        if (typeof window === 'undefined') return;

        this._accessToken = localStorage.getItem(this._accessTokenKey) || '';
        this._refreshToken = localStorage.getItem(this._refreshTokenKey) || '';
        this._expiratedAt = Number(localStorage.getItem(this._expiratedAtKey) || '');
    }

    get accessToken() {
        return this._accessToken;
    }

    set accessToken(value: string) {
        this._accessToken = value;
        localStorage.setItem(this._accessTokenKey, value);
    }

    get refreshToken() {
        return this._refreshToken;
    }

    set refreshToken(value: string) {
        this._refreshToken = value;
        localStorage.setItem(this._refreshTokenKey, value);
    }

    get expiratedAt(): number {
        return this._expiratedAt;
    }

    set expiratedAt(value: string | number) {
        this._expiratedAt = Number(value);
        localStorage.setItem(this._expiratedAtKey, value as string);
    }

    clear() {
        this._accessToken = '';
        this._refreshToken = '';
        this._expiratedAt = 0;

        localStorage.removeItem(this._accessTokenKey);
        localStorage.removeItem(this._refreshTokenKey);
        localStorage.removeItem(this._expiratedAtKey);
    }
}

export default new TokenService() as TokenService;
