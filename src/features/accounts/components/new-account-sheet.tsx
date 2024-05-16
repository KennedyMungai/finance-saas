import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'

type Props = {}

const NewAccountSheet = (props: Props) => {
	return (
		<Sheet open>
			<SheetContent className='space-y-4'>
				<SheetHeader>
					<SheetTitle>New Account</SheetTitle>
				</SheetHeader>
				<SheetDescription>
					Create a new account to track your transactions
				</SheetDescription>
			</SheetContent>
		</Sheet>
	)
}

export default NewAccountSheet
