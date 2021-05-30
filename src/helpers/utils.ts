export function sayHello() {
  return Math.random() < 0.5 ? 'Hello' : 'Hola';
}

export class Observable<T> {

	constructor(
		private functionTakingObserver: (observer: Observer<T>) => void
	) { }

	public subscribe(observer: Observer<T>) {
		return this.functionTakingObserver(observer);
	}

}

export interface Observer<T> {
	next: (data: T) => void,
	error?: (error: any) => any,
	complete?: Function
}