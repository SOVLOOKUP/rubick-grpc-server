import { Position, RGBA } from './types'

export interface RustBackendAPI {
	ioioStart: (port: string) => Promise<boolean>
	capture: (path: string) => Promise<undefined>
	colorPicker: (path: string, position: Position) => Promise<RGBA>
}

async function newRustBackend(): Promise<RustBackendAPI> {
	const rustBackend = await import(`rubick_backend-${process.platform}`)
	return {
		ioioStart: async (port: string) => {
			return await rustBackend.ioio_start(port)
		},
		capture: async (path: string) => {
			return await rustBackend.capture_start(path)
		},
		colorPicker: async (path: string, position: Position) => {
			return await rustBackend.color_picker_start(path, position.x, position.y)
		},
	}
}

export default newRustBackend
