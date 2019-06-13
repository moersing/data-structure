/***
 * 1. 链表必须有一个Head
 * 2. 每个元素必须有一个next和data,分别代表下一个元素和本身, 单项链表最后一个没有next
 */
import { isUndefined } from 'lodash'
interface IForeach<T> {
    (item: T, Index: Number): void
}
class Elem {
    data: any;
    prev: any;
    next: any;
    constructor(data?: any) {
        this.data = data
        this.prev = undefined
        this.next = undefined
    }
}
class LinerList<T> {
    head: Elem;
    current: Elem;
    foot: Elem;
    constructor(list?: T[]) {
        this.head = undefined
        this.current = undefined
        this.foot = undefined
        if (list.length) {
            this._covertArrayToList(list)
        }
    }
    /**
     * @desc 把数组转换成链表
     * @param  {T[]} list - 一个T类型的数组
     */
    private _covertArrayToList<T>(list: T[]) {
        list = [...[], ...list]
        /// 先设置头和尾
        this.head = new Elem(list.shift())
        this.foot = new Elem(list.pop())
        for (let elem of list) {
            let newElem = new Elem(elem)
            /// 表示从链表头部开始往后的第一个元素
            /// 那么需要把prev设置为头部,这样才能遍历
            if (isUndefined(this.current)) {
                this.head.next = newElem
                this.current = newElem
                /// 否则,新加入的元素的上一个是当前元素,而当前元素的下一个是新加入的元素
                /// 即： current.next = newElem
                ///      newElem.prev = current
            } else {
                this.current.next = newElem
                newElem.prev = this.current
                this.current = newElem
            }
        }
        /// 不要忘了最后一个的prev会等于当前的最新的元素
        this.foot.prev = this.current
    }
    isEmpty() {
        return !this.head
    }
    next(): Elem {
        return this.current.next
    }
    /**
     * @param  {IForeach<T>} loop
     */
    foreach(loop: IForeach<T>) {
        let current = this.head
        let index = 1
        while (current) {
            loop(current.data, index)
            index++
            current = current.next
        }
    }
    /**
     * @description 查找elem在链表中的位置
     * @param {Elem} elem
     */
    locatElem(elem: Elem): Number {
        let current = this.head
        let index = 1
        while (current) {
            if (current === elem) {
                break
            }
            index++
        }
        return index
    }
    /**
     * @param  {Number} index - 返回index位置上的值,如果没有找到,返回空的Elem
     */
    getElem(index: Number): Elem {
        let current = this.head
        let currentIndex = 1
        while (current) {
            if (currentIndex === index) {
                return current
            }
        }
        return new Elem()
    }
    /**
     * @param  {Elem} elem
     * @param  {Number} index? - 插入的位置,如果小于等于1,将插入头部
     */
    insertElem(elem: Elem, index?: Number) {
        if (!this.isEmpty() || index <= 1) {
            this.head = new Elem(elem)
            this.head.next = null
            this.current = this.head
        }
        else {
            let foundElem = this.getElem(index)
            /// 说明找到了最后一个
            if (isUndefined(foundElem.next)) {
                this.current.next = elem
                this.foot = elem
            }
            /// 否则插入下一个
            else {
                elem.prev = foundElem /// 上一个是被查到的元素
                elem.next = foundElem.next /// 下一个是之前元素的下一个
                foundElem.next = elem /// 把查找到的元素的下一个替换成插入的元素
            }
        }
    }
}
let a: LinerList<Number> = new LinerList([1, 2, 3, 4])
console.log(a)