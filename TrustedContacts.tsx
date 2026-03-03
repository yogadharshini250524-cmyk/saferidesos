import { useState } from "react";
import { Users, Plus, Trash2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Contact {
  id: string;
  name: string;
  phone: string;
}

const TrustedContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: "1", name: "Mom", phone: "+91 98765 43210" },
    { id: "2", name: "Best Friend", phone: "+91 87654 32109" },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const addContact = () => {
    if (!newName.trim() || !newPhone.trim()) {
      toast.error("Please fill in both fields");
      return;
    }
    setContacts((prev) => [
      ...prev,
      { id: Date.now().toString(), name: newName.trim(), phone: newPhone.trim() },
    ]);
    setNewName("");
    setNewPhone("");
    setShowAdd(false);
    toast.success("Contact added!");
  };

  const removeContact = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    toast.success("Contact removed");
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-foreground">
          <Users className="h-5 w-5 text-primary" />
          Trusted Contacts
        </h2>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowAdd(!showAdd)}
          className="border-border text-foreground hover:bg-muted"
        >
          <Plus className="mr-1 h-4 w-4" />
          Add
        </Button>
      </div>

      {showAdd && (
        <div className="card-glass mb-4 space-y-3 rounded-xl p-4">
          <Input
            placeholder="Contact name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border-border bg-muted/50 text-foreground placeholder:text-muted-foreground"
          />
          <Input
            placeholder="Phone number"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            className="border-border bg-muted/50 text-foreground placeholder:text-muted-foreground"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={addContact} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Save
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setShowAdd(false)} className="text-muted-foreground hover:text-foreground">
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="card-glass flex items-center gap-4 rounded-xl p-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20 font-display font-bold text-secondary">
              {contact.name[0]}
            </div>
            <div className="flex-1">
              <p className="font-display font-semibold text-foreground">{contact.name}</p>
              <p className="text-sm text-muted-foreground">{contact.phone}</p>
            </div>
            <a
              href={`tel:${contact.phone}`}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-safe/20 text-safe transition-colors hover:bg-safe/30"
            >
              <Phone className="h-4 w-4" />
            </a>
            <button
              onClick={() => removeContact(contact.id)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/20 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        {contacts.length === 0 && (
          <p className="rounded-xl bg-muted/30 p-6 text-center text-sm text-muted-foreground">
            No trusted contacts yet. Add someone you trust.
          </p>
        )}
      </div>
    </div>
  );
};

export default TrustedContacts;
