'use client'
import { useState } from 'react'
import PageHeader from '@/components/admin/ui/PageHeader'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import Badge from '@/components/admin/ui/Badge'
import { Clock, Plus, MoreHorizontal } from 'lucide-react'

// Demo data
const initialColumns = {
  new: { 
    id: 'new', 
    title: 'New Leads', 
    leads: [
      { id: 'L1', name: 'Jessica Alba', revenue: '$5k-$10k', challenge: 'Inconsistent cash flow', days: 2 },
      { id: 'L2', name: 'Robert Fox', revenue: 'Under $5k', challenge: 'Pricing strategy', days: 1 }
    ] 
  },
  contacted: { 
    id: 'contacted', 
    title: 'Contacted', 
    leads: [
      { id: 'L3', name: 'Wade Warren', revenue: '$10k+', challenge: 'Scaling operations', days: 4 }
    ] 
  },
  call_scheduled: { 
    id: 'call_scheduled', 
    title: 'Call Scheduled', 
    leads: [
      { id: 'L4', name: 'Jenny Wilson', revenue: '$5k-$10k', challenge: 'Sales conversion', days: 1 }
    ] 
  },
  proposal: { 
    id: 'proposal', 
    title: 'Proposal Sent', 
    leads: [
      { id: 'L5', name: 'Esther Howard', revenue: '$10k+', challenge: 'Team building', days: 3 }
    ] 
  },
}

export default function LeadsPage() {
  const [columns, setColumns] = useState(initialColumns)

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceCol = columns[source.droppableId as keyof typeof columns];
    const destCol = columns[destination.droppableId as keyof typeof columns];
    const sourceLeads = [...sourceCol.leads];
    const destLeads = source.droppableId === destination.droppableId ? sourceLeads : [...destCol.leads];
    
    const [removed] = sourceLeads.splice(source.index, 1);
    destLeads.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [source.droppableId]: { ...sourceCol, leads: sourceLeads },
      [destination.droppableId]: { ...destCol, leads: destLeads }
    });
  }

  return (
    <div className="space-y-6 h-full flex flex-col min-h-[80vh]">
      <PageHeader 
        title="Leads Pipeline" 
        description="Track potential clients from initial contact to conversion."
        action={<button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"><Plus className="w-4 h-4"/> Add Lead</button>}
      />
      
      <div className="flex-1 overflow-x-auto pb-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-6 h-full items-start">
            {Object.values(columns).map(col => (
              <Droppable key={col.id} droppableId={col.id}>
                {(provided) => (
                  <div 
                    ref={provided.innerRef} 
                    {...provided.droppableProps} 
                    className="w-[320px] shrink-0 bg-gray-50/80 rounded-xl p-4 border border-gray-200/60 flex flex-col max-h-full overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-800 text-sm">{col.title} 
                        <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full ml-2 text-xs font-medium">{col.leads.length}</span>
                      </h3>
                      <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-4 h-4" /></button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto min-h-[150px] space-y-3 pr-1">
                      {col.leads.map((lead, index) => (
                        <Draggable key={lead.id} draggableId={lead.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white p-4 rounded-lg border ${snapshot.isDragging ? 'border-blue-500 shadow-lg' : 'border-gray-200 shadow-sm hover:border-blue-300'} transition-all cursor-grab active:cursor-grabbing`}
                              style={{ ...provided.draggableProps.style }}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-gray-900 text-sm">{lead.name}</h4>
                              </div>
                              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{lead.challenge}</p>
                              
                              <div className="flex items-center justify-between mt-auto">
                                <Badge variant="gray">{lead.revenue}</Badge>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Clock className="w-3 h-3" /> {lead.days}d
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  )
}
