import { PlaceholdersAndVanishInput } from '@/components/magicui/placeholders-and-vanish-input'

export function InputDemo() {
  const placeholders = [
    '说些你想说的🫵！',
    '良言三冬暖，恶语四月寒🤙',
    '不喜欢咱就拉黑🙏'
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submitted')
  }
  return (
    <div className="relative bottom-0 ">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  )
}
