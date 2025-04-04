## [1.4.0](https://github.com/ZapZapMe/zapzap-web/compare/v1.3.0...v1.4.0) (2025-03-22)


### Features

* **tip:** gifs with tip messages ([c20bba4](https://github.com/ZapZapMe/zapzap-web/commit/c20bba457aadfb0a8ff66ee392e7c5496ffe2ed3))


### Bug Fixes

* ensure GIF tweet URL is included in tweet intent ([e35f8aa](https://github.com/ZapZapMe/zapzap-web/commit/e35f8aade51a9e7d3d0d3c8eb777faf0bcc902db))
* fixed logic for tweet reply target group ([a41486e](https://github.com/ZapZapMe/zapzap-web/commit/a41486e443a2af0271ee647b540c7fe697bcde34))
* tip if the embed doesn't load (sensitive topics don't load) ([cccbeea](https://github.com/ZapZapMe/zapzap-web/commit/cccbeeab2b8b745f94f358c8be7678cb0320b045))
* **tips:** cleanup ([5f0e730](https://github.com/ZapZapMe/zapzap-web/commit/5f0e73090a1d51060bfdb8e4b167b2799332479f))


### Chores

* added missing bool on main branch merge ([405f890](https://github.com/ZapZapMe/zapzap-web/commit/405f890d8873460b7e2bec49dbb93e9be92fa9b0))
* added tenor key to prod env ([dd2280c](https://github.com/ZapZapMe/zapzap-web/commit/dd2280c57f4ad70b89dc5473274ce035de2a3a15))
* redux error fixes ([f1c84b6](https://github.com/ZapZapMe/zapzap-web/commit/f1c84b6718573097615f2e67b61d622a3acc13ea))

## [1.3.0](https://github.com/ZapZapMe/zapzap-web/compare/v1.2.2...v1.3.0) (2025-02-27)


### Features

* **tips:** randomised tweet intent message ([bd0640b](https://github.com/ZapZapMe/zapzap-web/commit/bd0640b628212005352f3449db1c22c0e4ecec4e))


### Bug Fixes

* **profile:** fixed own x link ([5369f95](https://github.com/ZapZapMe/zapzap-web/commit/5369f95aa51d396353f98024a0693a8b134c243a))


### Code Refactoring

* redux transfer and code cleanup ([83b69f2](https://github.com/ZapZapMe/zapzap-web/commit/83b69f2518f992a538476cf983c0c2e472c83ace))


### Chores

* cleanup ([a522e7a](https://github.com/ZapZapMe/zapzap-web/commit/a522e7ae766ae506f42f70e12a08ffc94efa1244))
* cleanup ([4206abf](https://github.com/ZapZapMe/zapzap-web/commit/4206abf1e516d5a92d873215bf33199a32d60a15))
* cleanup ([937953c](https://github.com/ZapZapMe/zapzap-web/commit/937953cbfbfa0f7870932df84a15e578283ddd7e))
* disabled redeem and claim statements for intent ([eb07d7a](https://github.com/ZapZapMe/zapzap-web/commit/eb07d7ab944b3192a366552980bacc6a757f3464))
* removed unnecessary parameter on wallet link ([d88ba9f](https://github.com/ZapZapMe/zapzap-web/commit/d88ba9f0a19a8f8e6a5e706ea85d7e509c4631b9))

## [1.2.2](https://github.com/ZapZapMe/zapzap-web/compare/v1.2.1...v1.2.2) (2025-02-21)


### Code Refactoring

* **app:** cleanup console logs ([6b36d46](https://github.com/ZapZapMe/zapzap-web/commit/6b36d46ea217c1cfe8eb16574b74cd5af56c022a))
* **app:** file structure cleanup ([114e72d](https://github.com/ZapZapMe/zapzap-web/commit/114e72dc160c081ce164a01d8390f7a03fbe801d))
* **app:** removed auth context flow in favor of redux; ([dbbc01f](https://github.com/ZapZapMe/zapzap-web/commit/dbbc01ff565f51acaf42c66a7b3b177b98266aa6))
* **tips:** switched default tab for leaderboards ([060f80a](https://github.com/ZapZapMe/zapzap-web/commit/060f80af9867bd7beed7bba3e180c48ccffe961d))


### Chores

* **app:** added release preview command ([f7c588d](https://github.com/ZapZapMe/zapzap-web/commit/f7c588dbf0ab012d1a960708a8c124630f16cbc9))
* **tip:** disabled post on x checkbox for now ([1e5899c](https://github.com/ZapZapMe/zapzap-web/commit/1e5899c76b0fa1e4156be62fad0eb7f9fa5d6c26))

## [1.2.1](https://github.com/ZapZapMe/zapzap-web/compare/v1.2.0...v1.2.1) (2025-02-20)


### Bug Fixes

* hyperlinking the wallet help ([42052ce](https://github.com/ZapZapMe/zapzap-web/commit/42052ce77cc318d3b51e27ebb14d964e4a4c1b7b))
* **profile:** removed duplicate requests on user profile ([5971cf6](https://github.com/ZapZapMe/zapzap-web/commit/5971cf63bd3ba689891ec76860bbf07c8469c78a))
* **tip:** fixed payment status update on browser tab visibility change ([7674bfb](https://github.com/ZapZapMe/zapzap-web/commit/7674bfbc89c778d5f5931799861bcafe80c0fc60))
* typo (sat -> sats) and not opening multiple tabs for profile page ([d8d5b06](https://github.com/ZapZapMe/zapzap-web/commit/d8d5b06abb8c0cc5ddb7e7e5f3dfb5e0a9895945))
* typo (sat -> sats) and not opening multiple tabs for profile page ([9303443](https://github.com/ZapZapMe/zapzap-web/commit/93034430da80275dd9f125da96a0b12ce10bbaab))


### Chores

* add new wallet domain ([68c7a74](https://github.com/ZapZapMe/zapzap-web/commit/68c7a74f6c9ea790e0bcea749e198c29012b1765))
* **deployment:** testing different target for prod ([c8e132a](https://github.com/ZapZapMe/zapzap-web/commit/c8e132aa951573478152c6274698dcde9ef6f370))
* fixed deps ([a07549d](https://github.com/ZapZapMe/zapzap-web/commit/a07549de9ce45925fa9b7b2c2454e07dd7375b7c))
* **leaderboards:** name opens zapzap profile ([884f96f](https://github.com/ZapZapMe/zapzap-web/commit/884f96ff2e193e4e2cf41173a2eef587ba1bc6d6))
* revert back deps ([94d25ec](https://github.com/ZapZapMe/zapzap-web/commit/94d25ec011f944e6a8ef26dc2102762ee00d378e))
* testing sse ([7d088ab](https://github.com/ZapZapMe/zapzap-web/commit/7d088ab040c815948c05ff08be43c0dd270f40c6))
* testing sse ([8e5d6a6](https://github.com/ZapZapMe/zapzap-web/commit/8e5d6a61f66ae8a1a242860d8a1b46f6c54bc14a))

## [1.2.0](https://github.com/ZapZapMe/zapzap-web/compare/v1.1.1...v1.2.0) (2025-02-19)


### Features

* **settings:** added info link to zapping wallet ([d6ab894](https://github.com/ZapZapMe/zapzap-web/commit/d6ab8944d009abb778a97b9d400a87868cb3e5b6))
* **tip:** added ability to tweet the tip intentionally from the app ([afff91c](https://github.com/ZapZapMe/zapzap-web/commit/afff91cd6a6a33c8d87b4fc4f7e1a4d0f032ff41))
* **tips:** added leaderboards to the home page ([36d95eb](https://github.com/ZapZapMe/zapzap-web/commit/36d95eb8fba334d09a862be017b33f5a11bc7a4f))


### Bug Fixes

* **tip:** tweet intent address now includes receiver address ([ed32662](https://github.com/ZapZapMe/zapzap-web/commit/ed32662b1b403dc03755dc16572b94d8661becec))


### Code Refactoring

* added fonts files instead of google cdn ([f045a0f](https://github.com/ZapZapMe/zapzap-web/commit/f045a0f077211d894ec4cb95ddd42f453eb4cc7a))
* minor wallet info text move around ([203b3ba](https://github.com/ZapZapMe/zapzap-web/commit/203b3ba6e967accec1042c1c60498bec32ae628c))


### Chores

* mobile layout fix ([8cf5ed5](https://github.com/ZapZapMe/zapzap-web/commit/8cf5ed536ecb7f7c992cfb18d74ffebb263bd7bf))

## [1.1.1](https://github.com/ZapZapMe/zapzap-web/compare/v1.1.0...v1.1.1) (2025-02-18)


### Bug Fixes

* **button:** styles propagation ([a558e54](https://github.com/ZapZapMe/zapzap-web/commit/a558e54f47a43f28271588c8bd5bac3208851b63))
* h1.tagline font weight ([f4df9a6](https://github.com/ZapZapMe/zapzap-web/commit/f4df9a6eb2804c1d718a5385ef312716f6f9a166))
* **tip:** basic validation of username to prevent tipping own tweets ([53a0700](https://github.com/ZapZapMe/zapzap-web/commit/53a0700a4f254aa87178722de206c35b8c6cb8b5))
* **tip:** fixed layout of tweed container ([a69a32c](https://github.com/ZapZapMe/zapzap-web/commit/a69a32c1b6ffc580fa263fe5265d6d2d8869d464))


### Chores

* returned logout button ([389d89b](https://github.com/ZapZapMe/zapzap-web/commit/389d89b85d3bbb75c2a8f893a35eb7ff65013dbe))

## [1.1.0](https://github.com/ZapZapMe/zapzap-web/compare/v1.0.3...v1.1.0) (2025-02-14)


### Features

* **profile:** added conditions for user auth state and tips lists ([8e2c347](https://github.com/ZapZapMe/zapzap-web/commit/8e2c347ce001a139607ab051eb5ec5038cb5e9f0))


### Bug Fixes

* **footer:** fixed bot x url ([b5608c4](https://github.com/ZapZapMe/zapzap-web/commit/b5608c4bc1e180337806d60c4f4372dc452c7895))
* navbar styles ([bb4fe2f](https://github.com/ZapZapMe/zapzap-web/commit/bb4fe2fdf6503cbabbba49df5e5ddbc800c0a0e1))
* post tip on x is true by default ([00c48fd](https://github.com/ZapZapMe/zapzap-web/commit/00c48fde1966883e097180243288261f506493a4))
* **settings:** user wallet is now editable ([4774406](https://github.com/ZapZapMe/zapzap-web/commit/47744060b36d2f155b3bb7337e0f399712c5ae75))
* temporary solution for beta deployments ([05f22c0](https://github.com/ZapZapMe/zapzap-web/commit/05f22c005925ab49ecd72e99ac33ae80d70cf07d))
* **tip:** added lightning wallet url scheme ([9250db1](https://github.com/ZapZapMe/zapzap-web/commit/9250db1ee9e02a59f3925983d52ff8b2e4fc01f8))
* **tip:** cleanup any additional tracking from tweet url ([902dae1](https://github.com/ZapZapMe/zapzap-web/commit/902dae1196ca1ffda4d2084b57ddcdceae100b44))
* **tips:** store reset on successful tip ([f782f22](https://github.com/ZapZapMe/zapzap-web/commit/f782f22490ae935218f8a6542560cdd06bb2a4a5))
* **wallet settings:** changed input validation to email ([b1052d8](https://github.com/ZapZapMe/zapzap-web/commit/b1052d89a0a625523e8bf3c4cbfe931386bb256c))


### Code Refactoring

* profile page; ([8d7afb9](https://github.com/ZapZapMe/zapzap-web/commit/8d7afb983da5fb518f660699268ad3cc0edf6dcb))


### Tests

* checking the deployment pipeline ([7f9f8d9](https://github.com/ZapZapMe/zapzap-web/commit/7f9f8d9afee23e16c047a4a08bed1fc8b8edc54b))
* testing deployment ([294e120](https://github.com/ZapZapMe/zapzap-web/commit/294e120a14fb7435ca46e0b563e80ccef4bca1f3))
* testing env file update ([8199a31](https://github.com/ZapZapMe/zapzap-web/commit/8199a3173448130d47cf1944cde9c5c891c4896c))


### Chores

* fixes and updates to prev commit ([50d7595](https://github.com/ZapZapMe/zapzap-web/commit/50d7595146488658908c0a8a10713374673bee5e))

## [1.0.3](https://github.com/ZapZapMe/zapzap-web/compare/v1.0.2...v1.0.3) (2025-02-12)


### Bug Fixes

* env.production should always point to api.zap-zap.me ([18051ff](https://github.com/ZapZapMe/zapzap-web/commit/18051ffd131c1d133bb7a4ebb1e26b8fea453ccb))
* fixed avar placeholders on navbar and profile pages ([4135efa](https://github.com/ZapZapMe/zapzap-web/commit/4135efaf0611a3c8a0a34934024508375d6f646b))
* update README Docker details ([243a973](https://github.com/ZapZapMe/zapzap-web/commit/243a973cf1f30265ef2c29ccc780dca2c4c88316))


### Styles

* made separate components for default profile avatar and X icon ([f69641e](https://github.com/ZapZapMe/zapzap-web/commit/f69641ef4bcc0bfa428743a882f99bdd9ce03023))


### Code Refactoring

* moved HomePage components to corresponding route folder ([2cba432](https://github.com/ZapZapMe/zapzap-web/commit/2cba43291369774148acb227d4bd65961e63eb27))


### Chores

* added env definition to app title ([cb74e12](https://github.com/ZapZapMe/zapzap-web/commit/cb74e12ff1dee686529a7f035e90219f03a72304))
* adding bootstrap custom components ([aea2779](https://github.com/ZapZapMe/zapzap-web/commit/aea2779d4929395a64c62cbe969047438fcf10da))

## [1.0.2](https://github.com/ZapZapMe/zapzap-web/compare/v1.0.1...v1.0.2) (2025-02-12)


### Bug Fixes

* update conventional commits release branch name ([26860ae](https://github.com/ZapZapMe/zapzap-web/commit/26860ae6f04047ded41dc14cb023397b04100ffc))

## [1.0.1](https://github.com/ZapZapMe/zapzap-web/compare/v1.0.0...v1.0.1) (2025-02-12)


### Chores

* running commitlint tests ([7f57cf4](https://github.com/ZapZapMe/zapzap-web/commit/7f57cf4846b4709515afb88be00c8d5949a3be5a))
* testing commitlint rules ([4fb9b3c](https://github.com/ZapZapMe/zapzap-web/commit/4fb9b3cd23920929e09fd2613f709ebd4ea197b7))

## 1.0.0 (2025-02-12)


### Features

* Integrated semantic-release for automated version control ([96c6384](https://github.com/ZapZapMe/zapzap-web/commit/96c6384fa599f0b482456960cd818976286c94a4))


### Bug Fixes

* updating commit url for the changelog ([8be1baf](https://github.com/ZapZapMe/zapzap-web/commit/8be1bafdd58b8abdaaf24e072b7a3e7bc37da345))


### Documentation

* updated readme file with semantic-release notes ([7e6077e](https://github.com/ZapZapMe/zapzap-web/commit/7e6077ed570bba44679525d9a18ca9c678273f3a))


### Chores

* updated scope of changelog messages ([88cc012](https://github.com/ZapZapMe/zapzap-web/commit/88cc012761e8df66663da879f92861977759bcd2))
