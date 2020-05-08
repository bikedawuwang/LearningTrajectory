// good
const TYPE_AUDIO = Symbol('aaa')
const TYPE_VIDEO = Symbol('aaa')
const TYPE_IMAGE = Symbol('aaa')

function handleFileResource(resource) {
    switch (resource.type) {
        case TYPE_AUDIO:
            console.log(resource)
            break
        case TYPE_VIDEO:
            console.log(resource)
            break
        case TYPE_IMAGE:
            console.log(resource)
            break
        default:
            throw new Error('Unknown type of resource')
    }
}

const resource = { type: TYPE_AUDIO, fuck: 'fuck' }
handleFileResource(resource);