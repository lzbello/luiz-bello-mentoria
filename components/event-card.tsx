import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface Event {
  id: number
  title: string
  venue: string
  date: string
  image: string
  category: string
}

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">{event.category}</span>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="text-sm text-orange-500 font-medium mb-1">{event.date}</div>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
        <p className="text-gray-600 text-sm">{event.venue}</p>
      </CardContent>
    </Card>
  )
}
