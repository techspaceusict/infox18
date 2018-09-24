(function() {
    'use strict';
    const RENDER_OBJECT_BOUNDING_BOX = !1;
    const normalize = obj => {
        let box = new THREE.Box3().setFromObject(obj);
        let size = new THREE.Vector3();
        box.getCenter(obj.position);
        box.getSize(size);
        let scale = 1 / Math.max(size.x, size.y);
        obj.position.multiplyScalar(-scale);
        obj.scale.set(scale, scale, scale);
        return obj
    };
    const createDebugBoundingBox = obj => {
        let material = new THREE.LineBasicMaterial({
            color: 0x00ff00
        });
        let geometry = new THREE.PlaneGeometry(1, 1);
        let wireframe = new THREE.WireframeGeometry(geometry);
        let boundingBox = new THREE.LineSegments(wireframe, material);
        return boundingBox
    };
    const createContainer = obj => {
        let container = new THREE.Object3D();
        if (RENDER_OBJECT_BOUNDING_BOX) {
            container.add(createDebugBoundingBox())
        }
        container.add(obj);
        return container
    };
    var modelUtils = {
        normalize, createDebugBoundingBox, createContainer
    };
    const getFileExtension = url => {
        let path = url.split(/[?#]/)[0];
        let segments = path.split('/');
        let filename = segments.pop();
        let ext = filename.split('.');
        if (ext.length > 0) {
            return '.' + ext.pop()
        }
    };
    var urlUtils = {
        getFileExtension
    }
    const loaders = {};
    const register = (ext, handler) => {
        loaders[ext] = {
            load: handler,
            objectCache: {}
        }
    };
    const load = src => {
        let loader;
        let object;
        let ext = urlUtils.getFileExtension(src);
        if (ext) {
            loader = loaders[ext]
        }
        if (!loader) {
            console.error(`Couldn't load "${src}". Unknown object format "${ext}"`);
            return Promise.reject()
        }
        object = loader.objectCache[src];
        if (!object) {
            object = loader.load(src).then(obj => {
                modelUtils.normalize(obj);
                return modelUtils.createContainer(obj)
            });
            loader.objectCache[src] = object
        }
        return object.then(model => model.clone())
    };
    var modelLoader = {
        load, register
    };
    const parseUnitValue = value => {
        return parseFloat(value || 0)
    };
    const parseOriginValue = (originString, vec3) => {
        let transformOrigin = originString.split(' ');
        vec3.set(parseUnitValue(transformOrigin[0]), parseUnitValue(transformOrigin[1]), parseUnitValue(transformOrigin[2]))
    };
    const parseTransformValue = (matrixString, mat4) => {
        var c = matrixString.split(/\s*[(),]\s*/).slice(1, -1);
        if (c.length === 6) {
            mat4.set(+c[0], -c[2], 0, +c[4], -c[1], +c[3], 0, -c[5], 0, 0, 1, 0, 0, 0, 0, 1)
        } else if (c.length === 16) {
            mat4.set(+c[0], -c[4], +c[8], +c[12], -c[1], +c[5], -c[9], -c[13], +c[2], -c[6], +c[10], +c[14], +c[3], +c[7], +c[11], +c[15])
        } else {
            mat4.identity()
        }
    };
    var cssUtils = {
        parseTransformValue, parseOriginValue, parseUnitValue
    };
    const getTransformForElement = elem => {
        let m1 = new THREE.Matrix4();
        let transformMatrix = new THREE.Matrix4();
        let transformOrigin = new THREE.Vector3();
        let transformOriginMatrix = new THREE.Matrix4();
        let osParent = elem;
        let stack = [];
        let posX = 0;
        let posY = 0;
        if (elem.offsetWidth === 0 || elem.offsetHeight === 0) {
            return m1
        }
        posX -= elem.offsetWidth / 2;
        posY += elem.offsetHeight / 2;
        while (elem) {
            if (elem === osParent) {
                posX += elem.offsetLeft;
                posY += elem.offsetTop;
                osParent = elem.offsetParent
            }
            stack.push(elem);
            posX -= elem.scrollLeft;
            posY -= elem.scrollTop;
            elem = elem.parentElement
        }
        m1.makeTranslation(posX, -posY, 0);
        while (elem = stack.pop()) {
            let style = getComputedStyle(elem);
            cssUtils.parseOriginValue(style.transformOrigin, transformOrigin);
            cssUtils.parseTransformValue(style.transform, transformMatrix);
            let ox = transformOrigin.x - elem.offsetWidth / 2;
            let oy = transformOrigin.y - elem.offsetHeight / 2;
            let oz = transformOrigin.z;
            if (ox !== 0 || oy !== 0 || oz !== 0) {
                m1.multiply(transformOriginMatrix.makeTranslation(ox, -oy, oz));
                m1.multiply(transformMatrix);
                m1.multiply(transformOriginMatrix.makeTranslation(-ox, oy, -oz))
            } else {
                m1.multiply(transformMatrix)
            }
        }
        return m1
    };
    const getProjectionForElement = elem => {
        let perspectiveOrigin = new THREE.Vector3();
        let perspective;
        let clipBounds = {
            left: 0,
            top: 0,
            right: innerWidth,
            bottom: innerHeight
        };
        let cameraBounds = {
            left: 0,
            top: 0,
            right: innerWidth,
            bottom: innerHeight
        };
        while (elem) {
            let style = getComputedStyle(elem);
            let elemBounds = elem.getBoundingClientRect();
            let perspectiveValue = style.perspective;
            if (!perspective) {
                if (perspectiveValue !== 'none') {
                    perspective = cssUtils.parseUnitValue(perspectiveValue);
                    cameraBounds.top = elemBounds.top;
                    cameraBounds.left = elemBounds.left;
                    cameraBounds.right = elemBounds.right;
                    cameraBounds.bottom = elemBounds.bottom;
                    let perspectiveOriginValue = style.perspectiveOrigin;
                    if (perspectiveOriginValue) {
                        cssUtils.parseOriginValue(perspectiveOriginValue, perspectiveOrigin)
                    }
                }
            }
            if (style.overflow !== 'visible') {
                clipBounds.top = Math.max(elemBounds.top, clipBounds.top);
                clipBounds.left = Math.max(elemBounds.left, clipBounds.left);
                clipBounds.right = Math.min(elemBounds.right, clipBounds.right);
                clipBounds.bottom = Math.min(elemBounds.bottom, clipBounds.bottom)
            }
            elem = elem.parentElement
        }
        return {
            perspective: perspective,
            perspectiveOrigin: perspectiveOrigin,
            clipBounds: clipBounds,
            cameraBounds: cameraBounds
        }
    };
    const createStylesheet = cssText => {
        let styleElem = document.createElement('style');
        styleElem.textContent = cssText;
        return styleElem
    };
    var domUtils = {
        getTransformForElement, getProjectionForElement, createStylesheet
    };
    let camera;
    let overlayWidth;
    let overlayHeight;
    let perspectiveCamera;
    let orthographicCamera;
    let renderer;
    let scene;
    let light;
    const objs = [];
    const init = () => {
        if (scene) {
            return !1
        }
        scene = new THREE.Scene();
        light = new THREE.PointLight('#fff',2, 0);
        light.position.set(0, 0, 0);
        scene.add(light);
        renderer = new THREE.WebGLRenderer({
            antialias: !0,
            alpha: !0
        });
        renderer.setScissorTest(!0);
        renderer.setClearColor(0x000000, 0);
        renderer.autoClear = !1;
        renderer.sortObjects = !1;
        requestAnimationFrame(render);
        return renderer.domElement
    };
    const add = obj => {
        let index = objs.indexOf(obj);
        if (index === -1) {
            objs.push(obj);
            return !0
        }
        return !1
    };
    const remove = (obj) => {
        let index = objs.indexOf(obj);
        if (index > -1) {
            objs.splice(index, 1);
            return !0
        }
        return !1
    };
    const update = () => {
        overlayWidth = window.innerWidth;
        overlayHeight = window.innerHeight;
        camera = null;
        renderer.setSize(overlayWidth, overlayHeight);
        renderer.clear();
        objs.forEach(child => {
            let elem = child.elem;
            if (elem) {
                let projection;
                let transformMatrix;
                let clipHeight;
                let clipWidth;
                let width = elem.offsetWidth;
                if (width === 0) {
                    return
                }
                projection = domUtils.getProjectionForElement(elem);
                clipHeight = projection.clipBounds.bottom - projection.clipBounds.top;
                clipWidth = projection.clipBounds.right - projection.clipBounds.left;
                if (clipWidth <= 0 || clipHeight <= 0) {
                    return
                }
                transformMatrix = domUtils.getTransformForElement(elem);
                child.rotation.setFromRotationMatrix(transformMatrix);
                child.position.setFromMatrixPosition(transformMatrix);
                child.scale.setFromMatrixScale(transformMatrix);
                child.scale.multiplyScalar(width);
                child.position.x += width - overlayWidth / 2;
                child.position.y += overlayHeight / 2;
                if (projection.perspective) {
                    camera = setPerspectiveCamera(projection.cameraBounds, projection.perspective, projection.perspectiveOrigin)
                } else {
                    camera = setOrthographicCamera(projection.cameraBounds)
                }
                light.position.x = projection.cameraBounds.left + (projection.cameraBounds.right - projection.cameraBounds.left) / 2 - overlayWidth / 2;
                light.position.y = overlayHeight / 2 - projection.cameraBounds.top - (projection.cameraBounds.bottom - projection.cameraBounds.top) / 2;
                light.position.z = camera.far;
                renderer.setScissor(projection.clipBounds.left, projection.clipBounds.top, clipWidth, clipHeight);
                scene.add(child);
                renderer.render(scene, camera);
                scene.remove(child)
            }
        });
        return !!camera
    };
    const setOrthographicCamera = (bounds) => {
        let camera;
        if (!orthographicCamera) {
            orthographicCamera = new THREE.OrthographicCamera()
        }
        camera = orthographicCamera;
        camera.left = bounds.left - overlayWidth / 2;
        camera.top = -bounds.top + overlayHeight / 2;
        camera.bottom = -bounds.bottom + overlayHeight / 2;
        camera.right = bounds.right - overlayWidth / 2;
        camera.near = -700;
        camera.updateProjectionMatrix();
        return camera
    };
    const setPerspectiveCamera = (bounds, perspective, perspectiveOrigin) => {
        let camera;
        if (!perspectiveCamera) {
            perspectiveCamera = new THREE.PerspectiveCamera()
        }
        camera = perspectiveCamera;
        camera.fov = 180 * (2 * Math.atan(overlayHeight / 2 / perspective)) / Math.PI;
        camera.aspect = overlayWidth / overlayHeight;
        camera.position.set(0, 0, perspective);
        camera.updateProjectionMatrix();
        let originX = overlayWidth / 2 - bounds.left - perspectiveOrigin.x;
        let originY = overlayHeight / 2 - bounds.top - perspectiveOrigin.y;
        if (originX !== 0 || originY !== 0) {
            let tmpMatrix = camera.projectionMatrix.clone();
            camera.projectionMatrix.makeTranslation(-originX / (overlayWidth / 2), originY / (overlayHeight / 2), 0);
            camera.projectionMatrix.multiply(tmpMatrix);
            tmpMatrix.makeTranslation(originX, -originY, 0);
            camera.projectionMatrix.multiply(tmpMatrix)
        }
        return camera
    };
    const render = () => {
        requestAnimationFrame(render);
        update()
    };
    var modelLayer = {
        init, add, remove, render
    };
    const objects = new WeakMap();
    const ELEMENT_DEFAULT_STYLES = '#x-model-renderLayer{' + 'position:fixed;' + 'top:0;' + 'left:0;' + 'pointer-events:none;' + '}' + 'x-model{' + 'display:inline-block;' + 'width:250px;' + 'height:250px' + '}';
    let styleElem;
    const initModelLayer = () => {
        styleElem = domUtils.createStylesheet(ELEMENT_DEFAULT_STYLES);
        let head = document.documentElement.firstChild;
        head.insertBefore(styleElem, head.firstChild);
        let renderDomElement = modelLayer.init();
        renderDomElement.setAttribute('id', 'x-model-renderLayer');
        document.documentElement.appendChild(renderDomElement)
    };
    class HTMLModelElement extends HTMLElement {
        constructor() {
            super()
        }
        static get observedAttributes() {
            return ['src']
        }
        connectedCallback() {
            if (!styleElem) {
                initModelLayer()
            }
            let obj = objects.get(this);
            if (obj && obj.elem !== this) {
                obj.elem = this;
                modelLayer.add(obj)
            }
        }
        disconnectedCallback() {
            let obj = objects.get(this);
            if (obj && obj.elem === this) {
                modelLayer.remove(obj);
                obj.elem = null
            }
        }
        attributeChangedCallback(attribute, oldValue, newValue) {
            if (attribute === 'src') {
                this.disconnectedCallback();
                modelLoader.load(newValue).then(obj => {
                    let event = new UIEvent('load');
                    this.dispatchEvent(event);
                    objects.set(this, obj);
                    this.connectedCallback()
                }).catch(e => {
                    let event = new UIEvent('error');
                    this.dispatchEvent(event)
                })
            }
        }
    }
    let loader;
    var gltfLoader = src => {
        return new Promise((resolve, reject) => {
            const loadHandler = gltf => {
                resolve(gltf.scene)
            };
            const errorHandler = () => {
                reject()
            };
            if (!loader) {
                loader = new THREE.GLTFLoader()
            }
            return loader.load(src, loadHandler, null, errorHandler)
        })
    }
    let loader$1;
    var objLoader = src => {
        return new Promise((resolve, reject) => {
            const loadHandler = obj => {
                resolve(obj)
            };
            const errorHandler = () => {
                reject()
            };
            if (!loader$1) {
                loader$1 = new THREE.OBJLoader()
            }
            return loader$1.load(src, loadHandler, null, errorHandler)
        })
    }
    if ('customElements' in window) {
        if (!('THREE' in window)) {
            throw 'THREE (threejs.org) is required.'
        }
        if ('GLTFLoader' in THREE) {
            modelLoader.register('.gltf', gltfLoader);
            modelLoader.register('.glb', gltfLoader)
        }
        if ('OBJLoader' in THREE) {
            modelLoader.register('.obj', objLoader)
        }
        customElements.define('x-model', HTMLModelElement)
    }
}())