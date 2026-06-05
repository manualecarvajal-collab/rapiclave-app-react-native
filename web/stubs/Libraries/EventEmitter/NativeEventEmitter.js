export default class NativeEventEmitter {
  constructor(nativeModule) {
    this._nativeModule = nativeModule;
  }
  addListener(eventType, listener) {
    return { remove: () => {} };
  }
  removeAllListeners(eventType) {}
  emit(eventType, ...args) {}
}
