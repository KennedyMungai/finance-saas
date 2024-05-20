import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import { useCSVReader } from 'react-papaparse'

type Props = {
	onUpload: (results: any) => void
}

const UploadButton = ({ onUpload }: Props) => {
	const { CSVReader } = useCSVReader()

	// TODO: Add a paywall

	return (
		<CSVReader>
			{({ getRootProps }: any) => (
				<Button size='sm' {...getRootProps()}>
					<Upload className='size-4 mr-2' />
					Import
				</Button>
			)}
		</CSVReader>
	)
}

export default UploadButton
