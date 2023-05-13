const { useRef } = React

import { utilService } from "../../../services/util.service.js"

export function BookHome() {
    const imgRef = useRef()

    function onTada() {
        utilService.animateCSS(imgRef.current, 'tada')
            .then(() => {
                console.log('When animation ended')
            })
        console.log('animation')
    }

    return (
        <section ref={imgRef} onClick={onTada} className="miss-books-home" >
            <h1>Welcome To Miss Books!</h1>
        </section>
    )
}