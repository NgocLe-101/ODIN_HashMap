const defaultConfig = {
  hashMapSize: 16,
  loadFactor: 0.75,
};

export default class HashMap {
  #_buckets;
  #_length;
  constructor(config) {
    Object.entries({ ...defaultConfig, ...config }).forEach(([key, value]) => {
      this[key] = value;
    });
    this.#_buckets = new Array(this.hashMapSize);
    this.#_length = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.#_buckets.length;
    }

    return hashCode;
  }

  #findAvailableCodeForKey(key) {
    let hashCode = this.hash(key);
    if (
      this.#_buckets[hashCode] === undefined ||
      this.#_buckets[hashCode].key === key
    ) {
      return hashCode;
    } else {
      // Fixed collision
      let jumpStep = 1;
      while (jumpStep <= this.#_buckets.length) {
        const newHashCode = (hashCode + jumpStep) % this.#_buckets.length;
        if (
          this.#_buckets[newHashCode] === undefined ||
          this.#_buckets[newHashCode].key === key
        ) {
          return newHashCode;
        }
        jumpStep++;
      }
      return -1;
    }
  }
  currentCapacity() {
    return (
      this.#_buckets.filter((obj) => obj !== undefined).length /
      this.#_buckets.length
    );
  }
  #expandBuckets() {
    const oldArr = this.#_buckets.slice();
    const newSize = oldArr.length * 2;
    const newArr = new Array(newSize);
    this.#_buckets = newArr;
    oldArr.forEach((item) => {
      if (item !== undefined) {
        const hashCode = this.#findAvailableCodeForKey(item.key);
        this.#_buckets[hashCode] = { key: item.key, value: item.value };
      }
    });
  }
  set(key, value) {
    const hashCode = this.#findAvailableCodeForKey(key);
    this.#_buckets[hashCode] = { key, value };
    this.#_length++;
    if (this.currentCapacity() > this.loadFactor) {
      this.#expandBuckets();
    }
  }

  get(key) {
    const hashCode = this.#findAvailableCodeForKey(key);
    if (hashCode === -1 || this.#_buckets[hashCode] === undefined) {
      return null;
    }
    return this.#_buckets[hashCode];
  }

  has(key) {
    const hashCode = this.#findAvailableCodeForKey(key);
    if (hashCode === -1 || this.#_buckets[hashCode] === undefined) {
      return false;
    }
    return true;
  }

  remove(key) {
    if (!this.has(key)) {
      return false;
    }
    const hashCode = this.#findAvailableCodeForKey(key);
    this.#_buckets[hashCode] = undefined;
    this.#_length--;
    return true;
  }
  length() {
    return this.#_length;
  }
  clear() {
    this.#_buckets = this.#_buckets.map((item) => undefined);
  }
  keys() {
    return this.#_buckets
      .filter((item) => item !== undefined)
      .map((item) => item.key);
  }
  values() {
    return this.#_buckets
      .filter((item) => item !== undefined)
      .map((item) => item.value);
  }
  entries() {
    return this.#_buckets
      .filter((item) => item !== undefined)
      .map((item) => [item.key, item.value]);
  }
}
